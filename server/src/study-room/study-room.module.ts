import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRoomsService } from './study-room.service';
import { StudyRoomController } from './study-room.controller';
import { StudyRoom } from './entity/study-room.entity';
import { StudyRoomParticipant } from './entity/study-room-participant.entity';
import { StudyRoomRepository } from './repository/study-room.repository';
import { StudyRoomParticipantRepository } from './repository/study-room-participant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudyRoom, StudyRoomParticipant])],
  controllers: [StudyRoomController],
  providers: [StudyRoomsService, StudyRoomRepository, StudyRoomParticipantRepository],
  exports: [StudyRoomsService, StudyRoomRepository, StudyRoomParticipantRepository],
})
export class StudyRoomModule {}
