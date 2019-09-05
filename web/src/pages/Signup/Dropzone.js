import React from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "antd";

export default function Accept(props) {
  const {image, setImage} = props;
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: files => {
      const file = files[0];
      setImage(
        Object.assign(file, {
          image: file,
          preview: URL.createObjectURL(file)
        })
      );
    }
  });

  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {image ? (
          <img
            className="preview-image"
            src={image ? image.preview : null}
            alt=""
          />
        ) : (
          <div style={{ textAlign: "center", color: "#000" }}>
            <Icon type="camera" style={{ fontSize: 40 }} />
            <div>Profile Image</div>
          </div>
        )}
      </div>
    </div>
  );
}
