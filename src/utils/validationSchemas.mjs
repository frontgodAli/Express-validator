export const createUserValidation={
    firstName:{
        isLength:{
            options:{
                min:3,
                max:32
            },
            errorMessage:"length must be 3-32 characters"
        },
        notEmpty:{
            errorMessage:"the firstName shouldn't be empty"
        },
    },
    lastName:{
        isLength:{
            options:{
                min:3,
                max:32
            },
            errorMessage:"length must be 3-32 characters"
        },
        notEmpty:{
            errorMessage:"the lastName shouldn't be empty"
        },
    }
}