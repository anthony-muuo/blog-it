-- CreateTable
CREATE TABLE "blogs" (
    "blog_id" TEXT NOT NULL,
    "blog_synopsis" TEXT NOT NULL,
    "blog_content" TEXT NOT NULL,
    "featured_image" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blog_id")
);

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
