-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet" (
    "id" UUID NOT NULL,
    "conteudo" VARCHAR(100) NOT NULL,
    "tipo" CHAR(1) NOT NULL,
    "idUsuario" UUID NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "idUsuario" UUID NOT NULL,
    "idTweet" UUID NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("idUsuario","idTweet")
);

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_idTweet_fkey" FOREIGN KEY ("idTweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
