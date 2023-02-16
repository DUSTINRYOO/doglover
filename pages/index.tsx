import { NextPage } from "next";
import ReactPlayer from "react-player";
import styled from "styled-components";
import useSWR from "swr";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 24px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;
const VideoBox = styled.div`
  display: flex;
  height: 300px;
  box-sizing: content-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const Btn = styled.button`
  background-color: #ff8383;
  font-size: 20px;
  font-weight: 800;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 20px red;
  &:first-child {
    background-color: #f8ff6b;
    box-shadow: 0px 0px 20px yellow;
    margin-right: 30px;
  }
  &:active {
    scale: 1.1;
  }
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
interface ResponseType {
  url: string;
  isLiked: boolean;
}

const Home: NextPage = () => {
  const URL = "https://dogs-api.nomadcoders.workers.dev";
  const { data, mutate } = useSWR<ResponseType>(URL, {
    refreshInterval: 10000,
  });
  return (
    <Main>
      <h1>Dog Lover!</h1>
      <Box>
        <VideoBox>
          <ReactPlayer url={data?.url} playing height="300px" width="500px" />
        </VideoBox>
        <BtnBox>
          <Btn
            onClick={() => {
              mutate();
            }}
          >
            Show me another!
          </Btn>
          <Btn
            onClick={() => {
              const likeUnlike = !data?.isLiked;
              mutate({ ...data!, isLiked: likeUnlike }, { revalidate: false });
            }}
          >
            {data?.isLiked ? "Unlike" : "Like"}
          </Btn>
        </BtnBox>
      </Box>
    </Main>
  );
};

export default Home;
