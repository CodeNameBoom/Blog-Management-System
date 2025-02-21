//API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
  success:  {
    title:'Success',
    message: 'Data successfully loaded'
  },
  responseFailure:{
    title:'Error',
    message:'An error occured while fetching response from the server.Please Try Again!'
  },
  requestFailure:{
    title:'Error',
    message:'An error occured while parsing request data'
  },
  networkError:{
    title:'Error',
    message:'Unable to connect with server. Please check internet connectivity and try again later'
  },
  
  // validationError: {
  //   title: 'Validation Error',
  //   message: 'Please ensure all required fields are filled out correctly.'
  // },
  // duplicateError: {
  //   title: 'Duplicate Error',
  //   message: 'Username or email already exists. Please try a different one.'
  // }
}
// API SERVICE CALL 
//SAMPLE REQUEST
//NEED SERVICE CALL:{URL '/', METHOD: 'POST/GET/PUT/DELETE',PARAMS:TRUE/FLASE , QUERY:TURE/FLASE}

export const SERVICE_URLS ={
    userSignup : {url: '/signup' , method:'POST'},
    userLogin : {url: '/login' ,method:  'POST'},
    uploadFile : {url: '/file' , method: 'POST'},
    createPost : {url: 'create', method: 'POST'},

    getAllPosts : { url:'/posts', method:'GET' , params: true},
    getPostById : {url:'post', method:'GET', query: true},

    updatePost: { url: 'update', method:'PUT',query : true},

    deletePost: {url:'delete', method:'DELETE' ,query : true}
}