-- CreateEnum
CREATE TYPE "RandomObjectEnum" AS ENUM ('KAPPA', 'KEEPO');

-- CreateTable
CREATE TABLE "RandomObject" (
    "id" SERIAL NOT NULL,
    "stringValue" TEXT NOT NULL,
    "intValue" INTEGER NOT NULL,
    "floatValue" DOUBLE PRECISION NOT NULL,
    "booleanValue" BOOLEAN NOT NULL,
    "dateTimeValue" TIMESTAMP(3) NOT NULL,
    "jsonValue" JSONB NOT NULL,
    "enumValue" "RandomObjectEnum" NOT NULL,

    CONSTRAINT "RandomObject_pkey" PRIMARY KEY ("id")
);
