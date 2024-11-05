import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { AdminContext } from 'context/AdminContext';
import AdminServices from 'services/AdminServices';
import { notifyError, notifySuccess } from 'utils/toast';
const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ name, email, verifyEmail, password, role }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;
  
    if (location.pathname === '/login') {
      AdminServices.loginAdmin({ email, password })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Login Success!');
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('adminInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            if (res.redirectToDashboard) {
              history.push(res.redirectURL || '/dashboard'); // Redirect to specified URL or default dashboard
            } else {
              history.push('/');
            }
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
  
    } else if (location.pathname === '/signup') {
      AdminServices.registerAdmin({ name, email, password, role })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Register Success!');
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('adminInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            history.push('/');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
  
    } else if (location.pathname === '/forgot-password') {
      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };
  

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};
export default useLoginSubmit;
