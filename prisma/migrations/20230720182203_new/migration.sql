-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'RECIVED', 'CANCELED', 'REMOVED');

-- CreateEnum
CREATE TYPE "WhereToDonate" AS ENUM ('MOSQUE', 'ORPHANAGE', 'MADRASA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "trim(name)" VARCHAR(30) NOT NULL,
    "trim(email)" VARCHAR(35) NOT NULL,
    "trim(phone)" VARCHAR(15) NOT NULL,
    "trim(password)" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "donationAmount" DOUBLE PRECISION NOT NULL,
    "donatedTo" "WhereToDonate" NOT NULL,
    "trim(title)" VARCHAR(100),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_trim(email)_key" ON "User"("trim(email)");

-- CreateIndex
CREATE UNIQUE INDEX "User_trim(phone)_key" ON "User"("trim(phone)");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
