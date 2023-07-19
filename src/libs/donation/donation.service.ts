import { Injectable } from '@nestjs/common';
import { apiMathods } from 'src/helpers/api-func';
import { errorHandler } from 'src/helpers/errorHanders';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonationService {
  constructor(private readonly prismaService: PrismaService) {}
  private Donation = this.prismaService.donation;

  // ## GET ALL DONATIONS LIST (ADMIN ONLY)
  async getDonationLists(query, userLogged) {
    try {
      if (userLogged.role === 'ADMIN')
        return await apiMathods(this.Donation, query);
      return await apiMathods(this.Donation, query, false, userLogged);
    } catch (error) {
      return errorHandler(500, true, error.message);
    }
  }

  // ## ADD NEW DONATION
  async addDonation(data) {
    try {
      return await this.Donation.create({
        data,
      });
    } catch (error) {
      return errorHandler(500, true, error.message);
    }
  }

  // ## GET DONATION DETAILS
  async getDonationDetails(loggedUser, donationId) {
    const donation = await this.Donation.findUnique({
      where: { id: donationId },
      include: {
        user: { select: { id: true, name: true, phone: true } },
      },
    });
    if (!donation) return errorHandler(404);
    if (donation.userId === loggedUser.id || loggedUser.role === 'ADMIN')
      return donation;
    return errorHandler(401, false);
  }

  // ## UPDATE DONATION DATA BY ADMIN
  async updateDonationByAdmin(id, data) {
    try {
      return this.Donation.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      if (error.code === 'P2025') return errorHandler(404);
    }
  }

  // ## DELETE DONATION BY ADMIN
  async deleteDonationById(id) {
    try {
      await this.Donation.delete({
        where: { id },
      });
      return { message: 'Deleted' };
    } catch (error) {
      if (error.code === 'P2025') return errorHandler(404);
      return errorHandler(500, false, error.message);
    }
  }

  // ## UPDATE DONATION DATA BY USER
  async updateDonationByUser(loggedUser, donationId, updateInput) {
    const donation = await this.getDonationDetails(loggedUser, donationId);
    if (donation.status === 'PENDING') {
      return await this.Donation.update({
        where: { id: donationId },
        data: updateInput,
      });
    }
    if (donation.status === 'RECIVED' || donation.status === 'CANCELED')
      return errorHandler(406);
    if (donation.status === 'REMOVED') return errorHandler(404);
  }

  // ## SOFT DELETE DONATION BY USER
  async softDeleteDonationByUser(loggedUser, donationId, updateInput) {
    const donation = await this.getDonationDetails(loggedUser, donationId);

    if (
      (donation.status === 'PENDING' && updateInput.status === 'CANCELED') ||
      (donation.status === 'CANCELED' && updateInput.status === 'REMOVED')
    ) {
      return await this.Donation.update({
        where: { id: donationId },
        data: updateInput,
      });
    }
    if (donation.status === 'PENDING' || updateInput.status === 'REMOVED')
      return errorHandler(406);
    if (donation.status === 'RECIVED' || donation.status === 'CANCELED')
      return errorHandler(406);
    if (donation.status === 'REMOVED') return errorHandler(404);
  }
}
