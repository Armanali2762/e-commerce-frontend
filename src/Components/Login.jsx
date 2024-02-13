import React, { useEffect, useState } from 'react';
import { Card, CardBody, Input, Label } from 'reactstrap';
import MainHeader from './MainHeader';
import axios from 'axios';
import Base_URL from '../Api/Base_URL';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticate, setAuthenticate] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const getUsername = (e) => {
    setUsername(e.target.value);
  }
  const getPassword = (e) => {
    setPassword(e.target.value);
  }
  const authenticateUser = () => {
    axios.post(`${Base_URL}/authenticate`, {
      username: username,
      password: password,
    })
      .then(
        (response) => {
          console.log(response.data);
          if (response.data) {
            setAuthenticate(true);
            toast.success("User is authenticated!")
          } else {
            toast.error("User is not authenticated!")
          }

        },
        (error) => {
          console.log(error);
          setAuthenticate(false)
          toast.error("Error during authentication !");
        }
      );
  };
  
  const handleFeedbackOption = (option) => {
    if(option === 'Yes') {
      setShowFeedback(true);
    } else {
      setShowFeedback(false);
      setFeedback('');
    }
  }

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  }

  const handleLoginButtonClick = () => {
    authenticateUser();
  }

  return (
    <>
      {!authenticate && (
        <Card className='login'>
          <CardBody>
            <div>
              <Label id='language'>Choose Language</Label>
              <Input
                id="exampleSelect"
                name="language"
                type="select">
                <option>English</option>
                <option>Hindi</option>
                <option>Urdu</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Bengali</option>
              </Input>
              <h1 className='text-center'>Login !!</h1>
              <Label>Username *</Label>

              <Input type="text" title='username' name='username' value={username} onChange={getUsername}
                placeholder='&#xf007; Enter username' aria-describedby="emailHelp" />

              <Label className='mt-2'>Password *</Label>
              <Input type="password" title='password' name='password' value={password} onChange={getPassword}
                placeholder='&#xf023; Enter Password' />

              <div class="form-group mt-2">
                <Input type="checkbox" /> Remember me
                <a href='' class="forget-password">Forget password?</a>
              </div>
              <div className="text-center mt-2" id="for-space">
                <button onClick={handleLoginButtonClick} class="btn btn-primary btn-size">Login</button>
              </div>
              <div className="mt-3">
                <Label>Would you like to provide feedback?</Label>
                <div>
                  <Input type="radio" name="feedbackOption" value="Yes" onChange={(e) => handleFeedbackOption(e.target.value)} /> Yes
                  <Input type="radio" name="feedbackOption" value="No" onChange={(e) => handleFeedbackOption(e.target.value)} /> No
                </div>
              </div>
              {showFeedback && (
                <div className="mt-3">
                  <Label>Feedback</Label>
                  <Input type="textarea" value={feedback} onChange={handleFeedbackChange} />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      )}
      <ToastContainer />
      {authenticate && <MainHeader />}
    </>
  )
}
export default Login;
