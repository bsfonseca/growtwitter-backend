import { Tweet } from "@prisma/client";
import { Tweet as TweetBack } from "../models/tweet.model";
import { Usuario } from "../models/usuario.model";

export function adapterTweet(tweet: Tweet, usuario: Usuario): TweetBack {
    const novoTweet = new TweetBack(tweet.conteudo, tweet.tipo, usuario);
    novoTweet.id = tweet.id;

    return novoTweet;
}
