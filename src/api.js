import fetch from 'node-fetch';
import {createHash} from 'node:crypto'
import {privateKey, publicKey} from "./apiKeys.js";

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    let filterResult
    const timestamp = Date.now().toString()
    const hash = await getHash(publicKey, privateKey, timestamp)
    const image_size = "/portrait_xlarge.jpg"

   const response = await fetch(url + "?" + new URLSearchParams({
        apikey: publicKey,
        ts: timestamp,
        hash: hash,
    }))

    const datas = await response.json()

    filterResult = datas.data.results.filter(data => data.thumbnail.path !== "image_not_available")

    return filterResult.map(data => {
        return {
            name: data.name,
            description: data.description,
            imageUrl: data.thumbnail.path + image_size
        }
    });
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    return createHash('md5').update(timestamp + privateKey + publicKey).digest("hex");
}