import React, {useState} from "react";
import {Segment} from "semantic-ui-react";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apis from "../../Apis";

const University = ({profile,me}) => {

  const [edit, setEdit] = useState(false)
  const [plus, setPlus] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [major, setMajor] = useState("")
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
            <TextField id="standard-basic" label="학교" onChange={(event) => {
              setName(event.target.value)
            }}/>
            <TextField id="standard-basic" label="입학년도" onChange={(event) => {
              setStart(event.target.value)
            }}/>
            <TextField id="standard-basic" label="졸업년도" onChange={(event) => {
              setEnd(event.target.value)
            }}/>
            <TextField id="standard-basic" label="전공" onChange={(event) => {
              setMajor(event.target.value)
            }}/>
            <Button variant="contained" onClick={() => {
              if (plus) {
                apis.user.postSchool({
                  "schoolName": name,
                  "startYear": start,
                  "endYear": end,
                  "major": major
                }).then(r => profile.school.push(r.data))
              } else {
                apis.user.putSchool(id, {
                  "schoolName": name,
                  "startYear": start,
                  "endYear": end,
                  "major": major
                }).then(r => profile.school = profile.school.map((c) => {
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
        <h3>학력</h3>
        {me?<AddIcon onClick={()=>setPlus(true)} className="icon_button"/>:null}
      </div>

      {profile.school.map((s) => {
        return (
          <div className="box_title">
            <div>
              <h4>{s.schoolName}</h4>
              <h5>{s.major}</h5>
              <h5>{s.startYear + "~" + s.endYear}</h5>
            </div>
            {me ? <CreateIcon onClick={()=>{
              setEdit(true);
              setId(s.id)}
            } className="icon_button"/> : null}
          </div>
        )
      })}
    </Segment>
  );
}


export default University