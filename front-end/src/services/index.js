/* eslint-disable */
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiIP = process.env.VUE_APP_IP_API || 'http://localhost';
const apiRestPort = process.env.VUE_APP_PORT_REST || '3020';
export default {
    /**
     * getAll: Conecta com o backend para utilização do método GET para receber um ou mais itens como retorno
     * @param {*} controllerName Nome da controller que será utilizada no backend
     * @param {*} extraParams Parâmetros adicionais na query
     * @param {string} [action='list'] Caracterísitca do endpoint que por padrão recebe o valor 'list'
     */
    getAll(controllerName, extraParams, action = 'list') {
        return new Promise(
            (resolve, reject) => {
                try {
                    //var apiRestPort = extraParams.port;
                    var endpoint = `${apiIP}:${apiRestPort}/${controllerName}/${action}`;

                    if (extraParams.PageNumber != undefined) {
                        if (action == '') {
                            if (extraParams.IdEstacao != undefined)
                                endpoint = endpoint + 'Page/' + extraParams.PageNumber + '/IdEstacao/' + extraParams.IdEstacao
                            else
                                endpoint = endpoint + 'Page/' + extraParams.PageNumber
                        } else {
                            endpoint = endpoint + '/' + extraParams.PageNumber
                        }
                    }

                    if (extraParams.OrderBy != undefined) {
                        endpoint = endpoint + '/' + extraParams.OrderBy.Field + '/' + extraParams.OrderBy.By
                    }

                    axios.get(endpoint, {
                            extraParams
                        })
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        })
                } catch (e) {
                    reject(e);
                }
            }
        );
    },

    /**
     * getOne: Conecta com o backend para utilização do método GET para receber um item como retorno
     * @param {*} controllerName Nome da controller que será utilizada no backend
     * @param {*} extraParams Parâmetros adicionais na query
     */
    getOne(controllerName, extraParams) {
        return new Promise(
            (resolve, reject) => {
                try {
                    //var apiRestPort = extraParams.port;
                    const endpoint = `${apiIP}:${apiRestPort}/${controllerName}/${extraParams.PrimaryKey}/${extraParams.PageNumber}/${extraParams.OrderBy.Field}/${extraParams.OrderBy.By}`;
                    //console.log(endpoint)
                    axios.get(endpoint, {
                            extraParams
                        })
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        })
                } catch (e) {
                    reject(e);
                }
            }
        );
    },

    /**
     * getFilter: Conecta com o backend para utilização do método GET para receber um item ou mais como retorno após serem filtrados
     * @param {*} controllerName Nome da controller que será utilizada no backend
     * @param {*} extraParams Parâmetros adicionais na query
     */
    getFilter(controllerName, extraParams) {
        let params = "";

        for (const key in extraParams.SearchText) {
            params += key + '=' + extraParams.SearchText[key] + '&';
        }
        extraParams.params = params;

        return new Promise(
            (resolve, reject) => {
                try {
                    //var apiRestPort = extraParams.port;
                    let endpoint = `${apiIP}:${apiRestPort}/${controllerName}/filter/${extraParams.PageNumber}/${extraParams.OrderBy.Field}/${extraParams.OrderBy.By}?${params}`;

                    // endpoint = endpoint.replace(' ', '%20')
                    axios.get(endpoint, {
                            extraParams
                        })
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        })
                } catch (e) {
                    reject(e);
                }
            }
        );
    },

    /**
     * getFilterDetails: Conecta com o backend para utilização do método GET para receber um item ou mais como retorno após serem filtrados
     * @param {*} controllerName Nome da controller que será utilizada no backend
     * @param {*} extraParams Parâmetros adicionais na query
     */
    getFilterDetails(controllerName, extraParams) {
        let params = "";

        for (const key in extraParams.SearchText) {
            params += key + '=' + extraParams.SearchText[key] + '&';
        }
        extraParams.params = params;
        return new Promise(
            (resolve, reject) => {
                try {
                    //var apiRestPort = extraParams.port;
                    let endpoint = `${apiIP}:${apiRestPort}/${controllerName}/filter_details/${extraParams.PrimaryKey}/${extraParams.PageNumber}/${extraParams.OrderBy.Field}/${extraParams.OrderBy.By}?${params}`;

                    // endpoint = endpoint.replace(' ', '%20')
                    axios.get(endpoint, {
                            extraParams
                        })
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error);
                        })
                } catch (e) {
                    reject(e);
                }
            }
        );
    },

    /**
     * post: Conecta com o backend para utilização do método POST
     * @param {*} controllerName Nome da controller que será utilizada no backend
     * @param {string} [action='create'] Caracterísitca do endpoint que por padrão recebe o valor 'create'
     * @param {Object} data Objeto onde contém as informações que serão utilizadas no método
     * @param {*} extraParams Parâmetros adicionais na query
     */
    post(controllerName, action = 'create', data, extraParams) {
        return new Promise(
            (resolve, reject) => {
                try {
                    //var apiRestPort = extraParams.port;
                    var endpoint = `${apiIP}:${apiRestPort}/${controllerName}/${action}`;
                    axios.post(endpoint, data)
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error.response.data.error.errorMessage);
                        })
                } catch (e) {
                    reject(e);
                }
            }
        );
    },

    /**
     * put: Conecta com o backend para utilização do método PUT
     * @param {*} controllerName Nome da controller que será utilizada no backend
     * @param {string} [action='update'] Caracterísitca do endpoint que por padrão recebe o valor 'update'
     * @param {Object} data Objeto onde contém as informações que serão utilizadas no método
     * @param {*} extraParams Parâmetros adicionais na query
     */
    put(controllerName, action = 'update', data, extraParams) {
        return new Promise(
            (resolve, reject) => {
                try {
                    //var apiRestPort = extraParams.port;
                    var endpoint = `${apiIP}:${apiRestPort}/${controllerName}/${action}`;

                    axios.put(endpoint, data)
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error.response.data.error.errorMessage);
                        })
                } catch (e) {
                    reject(e);
                }
            }
        );
    },

    delete(controllerName, action = 'delete', id = null, extraParams) {
        return new Promise(
            (resolve, reject) => {
                try {
                    //var apiRestPort = extraParams.port;
                    var endpoint = `${apiIP}:${apiRestPort}/${controllerName}/`;
                    if (id == null) {
                        endpoint += `${action}`;
                    } else {
                        endpoint += `${action}/${id}`;
                    }
                    axios.delete(endpoint)
                        .then(function (response) {
                            resolve(response);
                        })
                        .catch(function (error) {
                            console.log(error)
                            reject(error.response.data.error.errorMessage);
                        })

                } catch (e) {
                    reject(e);
                }
            }
        );
    },

}