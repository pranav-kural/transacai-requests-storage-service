-- CreateTable
CREATE TABLE "Insight" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "insights" TEXT NOT NULL,
    "fromTime" TIMESTAMP(3) NOT NULL,
    "toTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Insight_requestId_key" ON "Insight"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Insight_clientId_key" ON "Insight"("clientId");
