import Header from '@components/common/Header';
import StopWatch from '@components/common/StopWatch';

const StudyRoomListHeader = ({ className }: { className?: string }) => {
  return (
    <Header
      className={className}
      title={
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-semibold">GOMZ</h1>
        </div>
      }
      stopWatch={
        <div className="text-xl font-normal">
          <StopWatch elapsedSeconds={Number(localStorage.getItem('totalStudyTime'))} />
        </div>
      }
      userInfo={
        <div className="flex gap-4 text-base font-normal">
          <div>{localStorage.getItem('nickName')}</div>
          <button className="underline-offset-4 hover:underline">로그인</button>
        </div>
      }
    />
  );
};

export default StudyRoomListHeader;