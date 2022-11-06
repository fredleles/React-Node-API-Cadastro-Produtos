export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  InputParametersNotFound = 'InputParametersNotFound',
  PageNotFound = 'PageNotFound',
}

// esse é o tipo do objeto vai ser usado construir a resposta da API
type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};

// aqui o tipo do catálogo
export type ErrorCatalog = {
  // onde cada chave desse objeto é uma chave do Enum ErrorTypes
  // e cada valor é um objeto de resposta da API
  [key in ErrorTypes]: ErrorResponseObject

};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  InputParametersNotFound: {
    error: 'Input parameters not found',
    httpStatus: 400,
  },
  PageNotFound: {
    error: 'Page not found',
    httpStatus: 404,
  },
};
