import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
const { v4: uuidv4 } = require('uuid');
import { Response } from 'express';
import { MailService } from './../mail/mail.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  // Create Admin
  // async create(createAdminDto: CreateAdminDto) {
  //   const { password, confirm_password } = createAdminDto;
  //   if (password !== confirm_password) {
  //     return new BadRequestException('Password did not match');
  //   }

  //   const hashed_password = await bcrypt.hash(password, 7);

  //   const createdAdmin = await this.adminModel.create({
  //     ...createAdminDto,
  //     hashed_password,
  //   });

  //   const tokens = await this.generateToken(createdAdmin);
  //   const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

  //   const updatedAdmin = await this.adminModel.findByIdAndUpdate(
  //     createdAdmin.id,
  //     { hashed_token },
  //     { new: true },
  //   );
  //   console.log(updatedAdmin);

  //   return updatedAdmin;
  // }

  //Generate Token
  async generateToken(admin: AdminDocument) {
    const jwtPayload = {
      id: admin.id,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    const response = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    return response;
  }

  // REGISTER ADMIN
  async signup(createAdminDto: CreateAdminDto, res: Response) {
    try {
      const existingAdmin = await this.adminModel.findOne({
        email: createAdminDto.email,
      });
      if (existingAdmin) {
        throw new Error('Admin already exists!');
      }

      if (createAdminDto.password !== createAdminDto.confirm_password) {
        throw new Error('Password does not match!');
      }

      const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);

      const newAdmin = new this.adminModel({
        ...createAdminDto,
        hashed_password: hashedPassword,
      });

      const tokens = await this.generateToken(newAdmin);

      const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
      const uniqueKey = uuidv4();

      newAdmin.hashed_token = hashedRefreshToken;
      newAdmin.activation_link = uniqueKey;

      const savedAdmin = await newAdmin.save();

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      await this.mailService.sendAdminConfirmation(savedAdmin);

      const response = {
        message: 'Admin registered',
        admin: savedAdmin,
        tokens,
        new: true,
      };

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // ACTIVATE LINK
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const updatedAdmin = await this.adminModel.findOneAndUpdate(
      { activation_link: link, is_active: false },
      { is_active: true },
      { new: true },
    );

    if (!updatedAdmin) {
      throw new BadRequestException('Admin already activated or link invalid');
    }

    const response = {
      message: 'Admin activated successfully',
      admin: updatedAdmin,
      new: true,
    };
    return response;
  }

  // LOGIN ADMIN
  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminModel.findOne({ email }).exec();

    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }

    if (!admin.is_active) {
      throw new BadRequestException('Admin is not active');
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);

    if (!isMatchPass) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.generateToken(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel
      .findOneAndUpdate(
        { _id: admin.id },
        { hashed_token: hashed_refresh_token },
        { new: true },
      )
      .exec();

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin,
      tokens,
    };
    return response;
  }

  // LOGOUT ADMIN
  async logout(refreshToken: string, res: Response) {
    try {
      console.log('Starting logout');
      const adminData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!adminData) {
        throw new ForbiddenException('Admin is not found');
      }

      console.log('Admin data:', adminData);

      const updatedAdmin = await this.adminModel
        .findOneAndUpdate(
          { _id: adminData.id },
          { hashed_token: null },
          { new: true },
        )
        .exec();

      if (!updatedAdmin) {
        throw new NotFoundException('Admin not found for update');
      }

      console.log('Updated admin:', updatedAdmin);

      res.clearCookie('refresh_token');

      const response = {
        message: 'Admin logged out successfully',
        admin: updatedAdmin,
      };
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  //REFRESH TOKEN
  async refreshToken(admin_id: string, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('Admin not found');
    }

    const admin = await this.adminModel.findById(admin_id);

    if (!admin || !admin.hashed_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_token);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.generateToken(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel
        .findOneAndUpdate(
          { _id: admin.id },
          { hashed_token: hashed_refresh_token },
          { new: true },
        )
        .exec();

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin refreshed',
      admin: updatedAdmin,
      tokens,
    };
    return response;
  }

  async findAll() {
    const admins = await this.adminModel.find().exec();
    return admins;
  }

  async findOne(id: string) {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .exec();

    if (!existingAdmin) {
      throw new NotFoundException('Admin not found');
    }

    return existingAdmin;
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
