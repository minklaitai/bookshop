import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'

const SecureUpload = () => {

  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async (type, timestamp, signature) => {

    const folder = 'images';

    const data = new FormData();
    data.append("file",  img);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    data.append("folder", folder);

    try {
      let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      let resourceType = 'image';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  }

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/sign-upload`, { folder });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Get signature for Image upload
      const signatureData = await getSignatureForUpload('images');
      console.log(signatureData); // Thêm dòng này để kiểm tra dữ liệu trả về
      
      const { timestamp: imgTimestamp, signature: imgSignature } = signatureData;
      
      // Get signature for video upload
    

      // Upload image file
      const imgUrl = await uploadFile('image', imgTimestamp, imgSignature);

      // Upload video file

      // Send backend api request
      await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/image`, { imgUrl});

      // Reset states 
      setImg(null);

      console.log("File upload success!");
      setLoading(false);
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>

      {
        loading && <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      }
    </div>


  )
}

export default SecureUpload