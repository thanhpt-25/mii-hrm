/*
  Warnings:

  - You are about to drop the `RecruitmentRequestWithSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecruitmentRequestWithSkill" DROP CONSTRAINT "RecruitmentRequestWithSkill_requestId_fkey";

-- DropForeignKey
ALTER TABLE "RecruitmentRequestWithSkill" DROP CONSTRAINT "RecruitmentRequestWithSkill_skillId_fkey";

-- DropTable
DROP TABLE "RecruitmentRequestWithSkill";

-- CreateTable
CREATE TABLE "_RecruitmentRequestToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecruitmentRequestToSkill_AB_unique" ON "_RecruitmentRequestToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_RecruitmentRequestToSkill_B_index" ON "_RecruitmentRequestToSkill"("B");

-- AddForeignKey
ALTER TABLE "_RecruitmentRequestToSkill" ADD CONSTRAINT "_RecruitmentRequestToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "RecruitmentRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecruitmentRequestToSkill" ADD CONSTRAINT "_RecruitmentRequestToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
