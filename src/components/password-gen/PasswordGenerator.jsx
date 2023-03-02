import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from '../../utils/characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from '../../utils/message'

function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(8)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must select atleast one option', true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing to copy!', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }
  }

  return (
    <div className='container'>
      <div className='generator'>
        <h2 className='generator__header text-muted'>Password Generator</h2>
        <div className='generator__password'>
          <input type="text" value={password} className="generated__password__container" disabled />
          <button onClick={handleCopyPassword} className='copy__btn'>
            COPY
          </button>
        </div>

        <div className="settings">
          <h4 className='settings__header text-muted'>Options</h4>
        </div>
        <div className="grouped">
          <div className='form-group'>
            <label htmlFor='password-strength'>Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type='number'
              className='password-strength'
              id='password-strength'
              name='password-strength'
              max='20'
              min='10'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type='checkbox'
              id='uppercase-letters'
              name='uppercase-letters'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type='checkbox'
              id='lowercase-letters'
              name='lowercase-letters'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='include-numbers'>Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox'
              id='include-numbers'
              name='include-numbers'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-symbols'>Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type='checkbox'
              id='include-symbols'
              name='include-symbols'
            />
          </div>
        </div>


        <button onClick={handleGeneratePassword} className='generator__btn'>
          Generate Password
        </button>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div >
    </div >
  )
}

export default PasswordGenerator
