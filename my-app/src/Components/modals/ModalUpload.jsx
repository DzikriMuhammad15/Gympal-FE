import React from "react";
import DragAndDrop from "../inputs/DragAndDrop";
import Cookies from 'js-cookies'
import axios from "axios";

export function ModalUpload({ show, close, data }) {
  const modalStyle = {
    display: show ? "block" : "none",
  };

  const backdropBlur = {
    display: show ? "block" : "none",
    backdropFilter: show ? "blur(10px)" : "none",
    transition: "backdrop-filter 0.3s ease-out",
  };

  

  const handleSend = async () => {
    try{
      const response = await axios.post("http://localhost:3001/pembayaran/createPembayaran", {
        "metode" : data.method,
        "months" : data.months,
        "bukti_pembayaran" : "ini dia"
      },{
        headers : {
          cookies : Cookies.getItem('jwt')
        }
      })

      if (response==201){
        close()
      }

    }catch(error){
      console.log(error);
      alert('gagal melakukan pembayaran');
      close();
    }
    }

  return (
    <>
      <div
        className={`modal-backdrop fade ${show ? "show" : ""}`}
        style={backdropBlur}
      ></div>
      <div
        className={`modal ${show ? "show" : ""}`}
        style={modalStyle}
        tabIndex={-1}
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <h3
              className="modal-title fw-bold py-3  text-center text-uppercase"
              style={{ letterSpacing: "10px" }}
            >
              Upload Files
            </h3>
            <div className="modal-body">
              <DragAndDrop />
            </div>
            <div className="modal-footer border-0 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn border-3 fw-bold"
                  data-bs-dismiss="modal"
                  onClick={close}
                  style={{ borderColor: "#92A492" }}
                >
                  Change File
                </button>
                <button
                  type="button"
                  className="btn fw-bold"
                  style={{ background: "#92A492" }}
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalUpload;
