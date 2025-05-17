export const BASE_URL = 'http://localhost:8080/api/v1';
export const ApiConstant = {
    auth: {
        login: '/login',
        register:'/register'
    },
    slider: {
        getAll: '/images'
    },
    course:{
        getAllCourse:'/allcourse',
        getCourseByCategory:'/category/:categoryId',
        getCourseById:'/courses/:courseId'
    },
    categories:{
        getAllCategories:'/categories',
    }

}