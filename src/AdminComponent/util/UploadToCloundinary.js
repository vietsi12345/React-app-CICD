import axios from 'axios';

const upload_prest = "restaurant"
const clound_name = 'ddok3d1hi'
const api_url= "https://api.cloudinary.com/v1_1/" + clound_name + "/image/upload"

var handleChangeImaeToCloundinary

// export default handleChangeImaeToCloundinary = async(file) =>{
//     const data = new FormData()
//     data.append('file', file);
//     data.append('upload_preset', upload_prest);
//     var url
//    await axios.post(`https://api.cloudinary.com/v1_1/${clound_name}/image/upload`, data)
//     .then(res => {
//         url = res.data.secure_url
//         console.log(url)
//         return url
//     })
//     .catch( err =>{
//         console.log(err);return "error"
//     })
// } 

export default handleChangeImaeToCloundinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_prest);  // Make sure `upload_preset` is defined;  // Replace with your actual Cloudinary cloud name

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${clound_name}/image/upload`, data);
        const url = response.data.secure_url;
        return url;
    } catch (err) {
        console.error(err);
        return "error";
    }
};

// export default handleChangeImaeToCloundinary = async(file) =>{
//     const data = new FormData()
//     data.append('file', file);
//     data.append('upload_preset', upload_prest);
//     data.append('clound_name', clound_name);

//     const res = await fetch(api_url, {
//         method: "post",
//         body: data  
//     })

//     const fileData = res.json();
//     console.log(fileData)
//     return fileData.url
// }


// const handleChangeImaeToCloundinary = async(file) =>{
//     const data = new FormData()
//     data.append('file', file);
//     data.append('upload_preset', upload_prest);
//     data.append('clound_name', clound_name);

//     const res = await fetch(api_url, {
//         method: "post",
//         body: data  
//     })
    
//     const fileData = res.json();
//     console.log(fileData)
//     return fileData.url
// }

// export default handleChangeImaeToCloundinary;