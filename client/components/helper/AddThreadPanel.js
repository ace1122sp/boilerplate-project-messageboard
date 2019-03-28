import React from 'react';

const AddThreadPanel = () => 
  <div>
    <button>x</button>
    <form>
      <label>New Thread</label>
      <input type='text' placeholder='thread' />
      <label>password</label>
      <input type='password' /> 
      <button>submit</button>
    </form>
  </div>

export default AddThreadPanel;
