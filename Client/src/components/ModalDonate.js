import { useContext, useState, useEffect } from "react";

import { Modal, Form, Row, Col, Button, Image } from "react-bootstrap";
import { API } from "../config/api";

import { UserContext } from "../contexts/userContext";

const ModalDonate = () => {
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState();
  const initialState = {
    donateAmout: "",
    proofAttachment: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!form.proofAttachment) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(form.proofAttachment);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.proofAttachment]);

  const clearState = () => {
    setForm({ ...initialState });
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleDonateModalTutup = () => {
    dispatch({
      type: "DONATEMODALTUTUP",
    });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("donateAmout", form.donateAmout);
      formData.append("proofAttachment", form.proofAttachment);

      await API.post(`/donate`);
      handleDonateModalTutup();
      setPreview(undefined);
      setForm(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      centered
      show={state.isVisibleDonate}
      onHide={() => {
        handleDonateModalTutup();
        clearState();
        setPreview(undefined);
      }}
    >
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <Form.Control
            onChange={(e) => onChange(e)}
            name="donateAmout"
            value={form.donateAmout}
            type="number"
            placeholder="Nominal Donation"
          />
          <Row>
            <Col xs={4.5}>
              <label className="custom-file-upload btn-primary btn btn-block">
                <input
                  onChange={(e) => onChange(e)}
                  name="proofAttachment"
                  type="file"
                />
                <div>
                  Attach Payment
                  <Image className="ml-2 " src="/Group 14.svg"></Image>
                </div>
              </label>
            </Col>

            <Col style={{ fontSize: "12px", marginLeft: "14px" }}>
              *transfers can be made to holyways accounts
            </Col>
          </Row>
          <Row className="w-100">
            {form.proofAttachment && <Image className="w-100" src={preview} />}
          </Row>

          <Button className="mt-5" type="submit" block variant="primary">
            Donate
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default ModalDonate;
