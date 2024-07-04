import { randomUUID } from "crypto";

export class DataBaseMemory{

    // Aqui utilizaremos uma Estrutura de dados chamada Map, que se assemelha ao objeto, porém com algumas funcionalidades diferentes.
    #videos = new Map();

    list(search){ 
        // Aqui encapsularemos com o array from, pois ele não retorna type de um array
        return Array.from(this.#videos.entries()).map((videoArray) =>{
            const id = videoArray[0];
            const data = videoArray[1];

            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if (search){
                return video.title.includes(search);
            }else{
                return true;
            }
        })
    }

    create(video){
        // criaremos um id com o método do crypto randomUUID
        const videoId = randomUUID();
        // set serve para que consiga adicionar alguma informação dentro do map.
        this.#videos.set(videoId, video);
    }

    update(id, video){
        this.#videos.set(id, video);
    }

    delete(id){
        this.#videos.delete(id);
    }


}