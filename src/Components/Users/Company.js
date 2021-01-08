import React, {useState} from "react";
import {Segment} from "semantic-ui-react";
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from "@material-ui/icons/Create";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apis from "../../Apis";

const Company = ({profile, me}) => {
  const [edit, setEdit] = useState(false)
  const [plus, setPlus] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  return (
    <Segment>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        className="modal"
        open={plus || edit}
        onClose={() => {
          setPlus(false)
          setEdit(false)
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="회사명" onChange={(event) => {
              setName(event.target.value)
            }}/>
            <TextField id="standard-basic" label="입사일" onChange={(event) => {
              setStart(event.target.value)
            }}/>
            <TextField id="standard-basic" label="퇴사일" onChange={(event) => {
              setEnd(event.target.value)
            }}/>
            <Button variant="contained" onClick={() => {
              if (plus) {
                apis.user.postCompany({
                  "companyName": name,
                  "startDate": start,
                  "endDate": end
                }).then(r => profile.company.push(r.data))
              } else {
                apis.user.putCompany(id, {
                  "companyName": name,
                  "startDate": start,
                  "endDate": end
                }).then(r => profile.company = profile.company.map((c) => {
                  if (c.id === id) {return r.data;}
                  else {return c;}
                }))
              }
              setPlus(false)
              setEdit(false)
            }}>확인</Button>
          </form>
        </div>
      </Modal>
      <div className="box_title margin_bot">
        <h3>경력사항</h3>
        {me ? <AddIcon onClick={() => setPlus(true)} className="icon_button"/> : null}
      </div>
      {profile.company.map((c) => {
        return (
          <div className="box_title">
            <div>
              <h4>{c.companyName}</h4>
              <h5>{c.startDate + "~" + c.endDate}</h5>
            </div>
            {me ? <CreateIcon onClick={() => {
              setEdit(true);
              setId(c.id)
            }} className={"icon_button"}/> : null}
          </div>
        )
      })}
    </Segment>
  );
}

export default Company