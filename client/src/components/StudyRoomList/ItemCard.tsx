import { useNavigate } from 'react-router-dom';
import Icon from '@components/common/Icon';

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

interface ResponseData {
  canAccess: boolean;
  error?: ErrorResponse;
}

interface ItemCardProps {
  roomId: string;
  roomName: string;
  categoryName: string;
  isPrivate: boolean;
  curParticipant: number;
  maxParticipant: number;
  openModal: () => void;
}

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_SIGNALING_SERVER_URL;

const ItemCard = ({
  roomId,
  roomName,
  categoryName,
  isPrivate,
  curParticipant,
  maxParticipant,
  openModal,
}: ItemCardProps) => {
  const navigate = useNavigate();

  const sendFormData = async () => {
    const resonse = await fetch(`${API_BASE_URL}/study-room/check?roomId=${roomId}`);

    const { canAccess, error }: ResponseData = await resonse.json();

    if (canAccess) {
      navigate(`/study-room/${roomId}`, { state: { roomName, maxParticipant } });
    } else if (error?.statusCode === 404) {
      navigate(0);
    }
  };

  const joinRoom = () => {
    sendFormData();
    navigate(`/study-room/${roomId}`, { state: { roomName, maxParticipant } });
  };

  return (
    <div className="hover:bg-gomz-gray-200 flex h-[6.25rem] w-[62.5rem] items-center justify-between rounded-2xl px-6">
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="font-semibold">{roomName}</div>
            {isPrivate && <Icon id="lock" className="text-gomz-black h-4 w-4 fill-current" />}
          </div>
          <Icon id="group" className="text-gomz-gray-400 h-4 w-4 fill-current" />
          <div className="text-gomz-gray-400 text-sm font-light">
            {curParticipant} / {maxParticipant}
          </div>
        </div>
        <div className="flex gap-1 tracking-widest">
          <div className="bg-gomz-black flex h-7 items-center rounded-full px-3 text-xs text-white">
            #{categoryName}
          </div>
        </div>
      </div>
      <button
        className="font-normal underline-offset-4 hover:underline"
        onClick={() => (isPrivate ? openModal() : joinRoom())}
      >
        입장하기 &gt;
      </button>
    </div>
  );
};

export default ItemCard;
