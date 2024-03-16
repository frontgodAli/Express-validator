export const createUserValidation={
    firstName:{
        isLength:{
            options:{
                min:5,
                max:32
            },
            errorMessage:"length 5-32"
        },
        notEmpty:{
            errorMessage:"the firstName shouldn't be empty"
        },
        isString:{
            errorMessage:"it should be a string"
        }

    },
    lastName:{
        isLength:{
            options:{
                min:5,
                max:32
            },
            errorMessage:"length 5-32"
        },
        notEmpty:{
            errorMessage:"the firstName shouldn't be empty"
        },
        isString:{
            errorMessage:"it should be a string"
        }

    }
}