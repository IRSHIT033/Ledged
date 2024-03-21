import React, { useState, useContext } from "react";
import "./ledger.css";
import { Web3ApiContext } from "../../context/Web3Context";
import { main } from "../../Util/web3Storage";
import { useNavigate } from "react-router-dom";
import { Images } from "../../assets";
const Ledger = () => {
  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState(false);
  const [file, setFile] = useState();
  const [workspace, SetworkSpace] = useState({ field_name: "", value: "" });
  const [preview, setPreview] = useState([]);
  const [fileAccess, SetFileAccess] = useState(false);

  const { Send_ledgerdata } = useContext(Web3ApiContext);

  const Deploy_ledger_data = async (e) => {
    try {
      e.preventDefault();
      await Send_ledgerdata(preview);
    } catch (err) {
      console.log(err);
    }
  };

  const delete_preview = (idx) => {
    const newPreview_data = preview.filter((d, i) => {
      return idx != i;
    });
    setPreview(newPreview_data);
  };

  return (
    <>
      <div className='section__padding'>
        <div className='create_container'>
          <div className='create_left'>
            <div className='options'>
              <div className="title">
                Features
              </div>
              <div className='options_top'>
                <div className='button__styling4'
                  onClick={() => {
                    SetFileAccess(false);
                    SetworkSpace({
                      field_name: "TITLE"
                    })
                  }}>
                  TITLE
                </div>
                <div className='button__styling4'
                  onClick={() => {
                    SetFileAccess(false);
                    SetworkSpace({
                      field_name: "ORGANISATION"
                    })
                  }}
                >ORGANISATION</div>
              </div>
              <div className='options_bottom'>
                <div className='button__styling4'
                  onClick={() => {
                    SetFileAccess(false);
                    SetworkSpace({
                      field_name: "",
                      value: ""
                    })
                  }}
                >CUSTOM</div>
              </div>
              <div className='options_bottom'>
                <div className='button__styling4'
                  onClick={() => {
                    SetworkSpace({ field_name: "ATTACHMENT", value: "" });
                    SetFileAccess(!fileAccess);
                  }}>ATTACHMENT</div>
              </div>
            </div>
            <div className='update'>
              {
                workspace.field_name === 'TITLE' &&
                (
                  <>

                    <input className='input_field'
                      defaultValue={workspace.field_name}
                      disabled
                    />
                    <textarea
                      placeholder="Ledger Title"
                      value={workspace.value}
                      onChange={(e) => {
                        SetworkSpace({ ...workspace, value: e.target.value })
                      }}
                    />
                    <div className='submit_button'
                      onClick={() => {
                        setPreview([...preview, workspace]);
                        console.log(workspace)
                        console.log(preview)
                        SetworkSpace({ field_name: "", value: "" });
                      }}
                    >
                      <img src={Images.arrowup} height={30} width={30} />
                    </div>
                  </>
                )
              }
              {
                workspace.field_name === 'ORGANISATION' &&
                (
                  <>

                    <input className='input_field'
                      defaultValue={workspace.field_name}
                      disabled
                    />
                    <textarea
                      placeholder="Ledger Organisation"
                      value={workspace.value}
                      onChange={(e) => {
                        SetworkSpace({ ...workspace, value: e.target.value })
                      }}
                    />
                    <div className='submit_button'
                      onClick={() => {
                        SetworkSpace({ field_name: "", value: "" });
                        setPreview([...preview, workspace]);
                        console.log(workspace)
                        console.log(preview)
                      }}
                    >
                      <img src={Images.arrowup} height={30} width={30} />
                    </div>
                  </>
                )
              }
              {
                workspace.field_name !== 'TITLE' && workspace.field_name !== 'ORGANISATION' && !fileAccess &&
                (
                  <>

                    <input className='input_field'
                      value={workspace.field_name}
                      placeholder="Custom Ledger Key"
                      onChange={(e) => {
                        SetworkSpace({ ...workspace, field_name: e.target.value })
                      }}
                    />
                    <textarea
                      placeholder="Cutom Ledger Value"
                      value={workspace.value}
                      onChange={(e) => {
                        SetworkSpace({ ...workspace, value: e.target.value })
                      }}
                    />
                    <div className='submit_button'
                      onClick={() => {
                        SetworkSpace({ field_name: "", value: "" });
                        setPreview([...preview, workspace]);
                        console.log(workspace)
                        console.log(preview)
                      }}
                    >
                      <img src={Images.arrowup} height={30} width={30} />
                    </div>
                  </>
                )
              }
              {
                fileAccess &&
                (
                  <>
                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      name="file"
                      onChange={async (e) => {
                        setLoadingImage(true);
                        const cid = await main(e.target.files);
                        SetworkSpace({ ...workspace, value: cid });
                        setLoadingImage(false);
                      }}
                    />
                    {
                      !loadingImage ? (
                        <>
                          Uploading..
                        </>
                      ) :
                        <>
                          <div className='submit_button'
                            onClick={() => {
                              SetworkSpace({ field_name: "", value: "" });
                              setPreview([...preview, workspace]);
                              console.log(workspace)
                              console.log(preview)
                            }}
                          >
                            <img src={Images.arrowup} height={30} width={30} />
                          </div>
                        </>
                    }
                  </>
                )
              }
            </div>
          </div>
          <div className='create_right'>
            <div className='text_img'>
              <div className='preview_header'>LEDGER PREVIEW</div>
              {
                preview.map((p, idx) => (
                  <>
                    <div key={idx}>
                      <div className="preview_each">
                        <div className="preview_top">
                          <div className="preview_key">{p.field_name}</div>
                          <div className="preview_delete" onClick={() => { delete_preview(idx) }} >
                            <img src={Images.deleteIcon} height={20} width={20} alt="delete" />
                          </div>
                        </div>

                        <div className="preview_value">
                          {p.value}
                        </div>


                      </div>
                    </div>
                  </>
                ))
              }
            </div>
            <div className='deploy_button'
            >

              <div className='button__styling4'
                onClick={Deploy_ledger_data}
              >Deploy</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="led__ledger">
        <div className="led__tools">
          <div className="tool__buttons">
            <button
              onClick={() => {
                SetFileAccess(false);
                SetworkSpace({ field_name: "Title", value: "" });
              }}
            >
              Title
            </button>
            <button
              onClick={() => {
                SetFileAccess(false);
                SetworkSpace({ field_name: "Organization", value: "" });
              }}
            >
              Organisation
            </button>
            <button
              onClick={() => {
                SetFileAccess(false);
                SetworkSpace({ field_name: "", value: "" });
              }}
            >
              Custom Fields
            </button>
            <button
              onClick={() => {
                SetworkSpace({ field_name: "", value: "" });
                SetFileAccess(!fileAccess);
              }}
            >
              Add File
            </button>
          </div>
        </div>

        <div className="led__workspace">
          <div className="workspace__inputs">
            <input
              placeholder="Enter Field Name"
              value={workspace.field_name}
              onChange={(e) =>
                SetworkSpace({ ...workspace, field_name: e.target.value })
              }
            />
            {fileAccess ? (
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                name="file"
                onChange={async (e) => {
                  SetLoading(true);
                  const cid = await main(e.target.files);
                  SetworkSpace({ ...workspace, value: cid });
                  SetLoading(false);
                }}
              />
            ) : (
              <input
                placeholder="Enter Field Name"
                value={workspace.value}
                onChange={(e) =>
                  SetworkSpace({ ...workspace, value: e.target.value })
                }
              />
            )}
          </div>

          <div className="workspace__button">
            {!loading ? (
              <button
                onClick={() => {
                  SetworkSpace({ field_name: "", value: "" });
                  setPreview([...preview, workspace]);
                }}
              >
                Add
              </button>
            ) : (
              <>
                <Loading />
              </>
            )}
          </div>
        </div>

        <div className="led__preview">
          <div className="led__preview-header">PREVIEW</div>
          {preview.map((p, idx) => (
            <div key={idx}>
              <div className="led__preview-table">
                <div className="led__preview-field">{p.field_name}</div>

                <div className="led__preview-colon">:</div>

                <div className="led__preview-value">
                  {p.value?.length > 20
                    ? p.value?.slice(0, 6) + "..."
                    : p.value}
                </div>

                <div className="led__preview-delete">
                  <FaTrashAlt onClick={() => delete_preview(idx)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="led__deploy section__padding">
        <button onClick={Deploy_ledger_data}>Deploy</button>
      </div> */}
    </>
  );
};
export default Ledger;
