import { NextPage } from "next";
import ReactPlayer from "react-player";
import styled from "styled-components";
import useSWR from "swr";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 24px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 50px;
`;
const VideoBox = styled.div`
  margin: 30px;
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
  }
  &:active {
    scale: 1.1;
  }
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
      <h1>Dog Lover! Yes, this is for you!</h1>
      <Box>
        <VideoBox>
          <ReactPlayer url={data?.url} playing />
        </VideoBox>
        <BtnBox>
          <Btn
            onClick={() => {
              mutate();
            }}
          >
            Give me another!
          </Btn>
          <Btn
            onClick={() => {
              const likeUnlike = !data?.isLiked;
              console.log("clicked");
              console.log(likeUnlike);
              mutate({ ...data!, isLiked: likeUnlike }, { revalidate: false });
              console.log(likeUnlike);
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
