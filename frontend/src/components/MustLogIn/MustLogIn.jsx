import { useNavigate } from "react-router-dom";
import {Box, Text, Wrapper} from "./MustLogIn.styles";


const MustLogIn = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Box>
        <Text className='header'>
          You must log in first.
        </Text>
        <button className="btn_purple" onClick={() => navigate('/login')}>
            Continue to log in
        </button>
        </Box>
    </Wrapper>

  );
}

export default MustLogIn