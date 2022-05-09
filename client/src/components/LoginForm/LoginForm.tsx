import React, { FC, useState } from 'react';
import { EMPTY_STRING } from 'utils/constants';
import { useUser } from 'store/user';

const LoginForm: FC = () => {
  const user = useUser();

  const [email, setEmail] = useState(EMPTY_STRING);
  const [password, setPassword] = useState(EMPTY_STRING);

  const onSubmit = async () => {
    await user.login({ email, password });
  };

  return (
    <form>
      <div>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </label>
      </div>
      <div>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </label>
      </div>
      <button type="button" onClick={onSubmit}>→</button>
    </form>
  );
};

export { LoginForm };
