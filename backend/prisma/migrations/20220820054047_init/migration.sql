-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CbtForm" (
    "id" TEXT NOT NULL,
    "feelBefore" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "hotThought" TEXT NOT NULL,
    "evidenceFor" TEXT NOT NULL,
    "evidenceAgainst" TEXT NOT NULL,
    "balancedThought" TEXT NOT NULL,
    "feelAfter" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "CbtForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emotions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cbtFormId" TEXT,

    CONSTRAINT "Emotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thoughts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cbtFormId" TEXT,

    CONSTRAINT "Thoughts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CbtForm" ADD CONSTRAINT "CbtForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emotions" ADD CONSTRAINT "Emotions_cbtFormId_fkey" FOREIGN KEY ("cbtFormId") REFERENCES "CbtForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thoughts" ADD CONSTRAINT "Thoughts_cbtFormId_fkey" FOREIGN KEY ("cbtFormId") REFERENCES "CbtForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
