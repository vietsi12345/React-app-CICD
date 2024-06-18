
import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";


export default function testAdmin() {
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("hzxyensd5");
  // Replace with your own upload preset
  const [uploadPreset] = useState("aoh4fpwm");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  return (
    <div className="App">
      <div style={{ width: "800px" }}>
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
    </div>
  );
}