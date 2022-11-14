//
//  Libraries
//
import { useState } from 'react'
import { Paper, Grid, Typography } from '@mui/material'
//
//  Utilities
//
import registerUser from '../../services/registerUser'
import MyQueryPromise from '../../services/MyQueryPromise'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugModule = 'QuizRegister'
//
// Constants
//
const sqlClient = 'QuizRegister'
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialFValues = {
  name: '',
  fedid: '',
  fedcountry: 'NZ',
  email: '',
  password: ''
}
//...................................................................................
//.  Main Line
//...................................................................................
function QuizRegister({ handlePage }) {
  if (debugFunStartSetting) console.log(debugModule)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useMyForm(initialFValues, true, validate)
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  function validate(fieldValues = values) {
    if (debugFunStartSetting) console.log('validate')
    let temp = { ...errors }
    //
    //  name
    //
    if ('name' in fieldValues) {
      temp.name = fieldValues.name.length !== 0 ? '' : 'This field is required.'
    }
    //
    //  email
    //
    if ('email' in fieldValues) {
      temp.email = validateEmail(fieldValues.email) ? '' : 'Email is not a valid format'
    }
    //
    //  password
    //
    if ('password' in fieldValues) {
      temp.password = fieldValues.password.length !== 0 ? '' : 'This field is required.'
    }
    //
    //  Set the errors
    //
    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')
  }
  //...................................................................................
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  function FormSubmit(e) {
    if (debugFunStartSetting) console.log('FormSubmit')
    if (validate()) {
      FormUpdate()
    }
  }
  //...................................................................................
  //.  Update
  //...................................................................................
  function FormUpdate() {
    if (debugFunStartSetting) console.log('FormUpdate')
    //
    //  Deconstruct values
    //
    const { name, email, password, fedid, fedcountry } = values
    if (debugLog) console.log('values ', values)
    //
    //  Process promise
    //
    const params = {
      sqlCaller: sqlClient,
      email: email,
      password: password,
      name: name,
      fedid: fedid,
      fedcountry: fedcountry,
      dftmaxquestions: 5,
      dftowner: 'NZBridge',
      showprogress: true,
      showscore: true,
      sortquestions: true,
      skipcorrect: true,
      admin: false
    }
    const myPromiseRegister = MyQueryPromise(registerUser(params, { setForm_message }))
    //
    //  Resolve Status
    //
    myPromiseRegister.then(function (user) {
      if (debugLog) console.log('user ', user)
      if (user) {
        setForm_message(`Data updated in Database with ID(${user.u_id})`)
        sessionStorage.setItem('User_Settings_User', JSON.stringify(user))
        handlePage('QuizSignin')
      }
      return
    })
    return myPromiseRegister
  }

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm>
        <Paper
          sx={{
            margin: 1,
            padding: 1,
            maxWidth: 400,
            backgroundColor: 'whitesmoke'
          }}
        >
          <Grid
            container
            spacing={1}
            justify='center'
            alignItems='center'
            direction='column'
            style={{ minheight: '100vh' }}
          >
            {/*.................................................................................................*/}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant='h6' style={{ color: 'blue' }}>
                Registration Page
              </Typography>
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='email'
                label='email'
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
                sx={{ minWidth: '300px' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='password'
                label='password'
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
                sx={{ minWidth: '300px' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='name'
                label='name'
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
                sx={{ minWidth: '300px' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='fedid'
                label='Bridge Federation Id'
                value={values.fedid}
                onChange={handleInputChange}
                error={errors.fedid}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='fedcountry'
                label='Country'
                value={values.fedcountry}
                onChange={handleInputChange}
                error={errors.fedcountry}
              />
            </Grid>

            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <Typography style={{ color: 'red' }}>{form_message}</Typography>
            </Grid>

            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyButton
                text='Register'
                onClick={() => {
                  FormSubmit()
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        {/*.................................................................................................*/}
        <Grid item xs={12}>
          <MyButton
            color='warning'
            onClick={() => {
              handlePage('QuizSignin')
            }}
            text='Signin'
          />
        </Grid>
        {/*.................................................................................................*/}
      </MyForm>
    </>
  )
}

export default QuizRegister
