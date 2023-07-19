import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  ParseUUIDPipe,
  Param,
  Put,
  Delete,
  Query,
  Request,
  Patch,
} from '@nestjs/common';
import { DonationService } from './donation.service';

import {
  DonationDto,
  DonationSoftDeleteByUserDto,
  DonationUpdateByAdminDto,
  DonationUpdateByUserDto,
} from './dtos/donation.dtos';
import { AuthGuard, AdminGuard } from 'src/utils/auth.guards';

@Controller('api/donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  // ## GET ALL DONATIONS (ADMIN ONLY)
  @UseGuards(AuthGuard)
  @Get()
  getDonations(@Query() query: string, @Request() request) {
    const userLogged = request.user;
    return this.donationService.getDonationLists(query, userLogged);
  }

  // ## ADD DONATIONS
  @UseGuards(AuthGuard)
  @Post()
  addDonation(@Body() donationInput: DonationDto, @Request() request) {
    donationInput.userId = request.user.id;
    return this.donationService.addDonation(donationInput);
  }

  // ## GET DONATION DETAILS FOR AUTH USERS/ADMIN
  @UseGuards(AuthGuard)
  @Get(':donationId')
  async getDonationDetails(
    @Param('donationId', ParseUUIDPipe) donationId: string,
    @Request() request,
  ) {
    const userLogged = request.user;
    return this.donationService.getDonationDetails(userLogged, donationId);
  }

  // ## UPDATE DONATION DATA BY ADMIN
  @UseGuards(AuthGuard, AdminGuard)
  @Put(':donationId')
  updateDonationByAdmin(
    @Param('donationId', ParseUUIDPipe) donationId: string,
    @Body() updateInput: DonationUpdateByAdminDto,
  ) {
    return this.donationService.updateDonationByAdmin(donationId, updateInput);
  }

  // ## DELETE DONATION BY ADMIN
  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':donationId')
  deleteDonationByAdmin(
    @Param('donationId', ParseUUIDPipe) donationId: string,
  ) {
    return this.donationService.deleteDonationById(donationId);
  }

  // ## UPDATE DONATION DETAILS BY USER
  @UseGuards(AuthGuard)
  @Patch('user/:donationId')
  updateDonationByUser(
    @Param('donationId', ParseUUIDPipe) donationId: string,
    @Body() updateInput: DonationUpdateByUserDto,
    @Request() request,
  ) {
    const userLogged = request.user;
    return this.donationService.updateDonationByUser(
      userLogged,
      donationId,
      updateInput,
    );
  }

  // ## SOFT DELETE DONATION BY USER
  @UseGuards(AuthGuard)
  @Patch('soft-delete/:donationId')
  softDeleteDonationByUser(
    @Param('donationId', ParseUUIDPipe) donationId: string,
    @Body() updateInput: DonationSoftDeleteByUserDto,
    @Request() request,
  ) {
    const userLogged = request.user;
    return this.donationService.softDeleteDonationByUser(
      userLogged,
      donationId,
      updateInput,
    );
  }
}
