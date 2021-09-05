import React, { useState } from 'react';
import * as Style from './styled';
import { ProjectClientType, SkillClientType } from '../../../../@types/client';
import { Icon, Title, Paragraph, Tag, Anchor } from '../../atom';
import { dateToString } from '../../../../utils/date';
import { BoxWithIcon } from '../../molecule';
import { ProjectModal } from '..';
import { ProjectValidatorType } from '../../../../validator/projectValidator';

interface ProjectItemProps {
  project: ProjectClientType;
  editableAuthority: boolean;
  totalSkillList: SkillClientType[];
  handleDeleteItem: (projectId: number) => void;
  handleModifyItem: (data: ProjectValidatorType) => Promise<string>;
}

function ProjectItem({
  project,
  editableAuthority,
  totalSkillList,
  handleDeleteItem,
  handleModifyItem,
}: ProjectItemProps) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const toggleProjectModifyModal = () => {
    setProjectModalOpen(!projectModalOpen);
  };

  const handleModifySubmit = async (data: ProjectValidatorType) => {
    const error = await handleModifyItem(data);
    if (!error.length) {
      toggleProjectModifyModal();
    }
    return error;
  };

  return (
    <>
      {projectModalOpen && (
        <ProjectModal
          isModify
          project={project}
          totalSkillList={totalSkillList}
          handleModalClose={toggleProjectModifyModal}
          onSubmit={handleModifySubmit}
        />
      )}
      <Style.Container>
        <Style.Header>
          <Style.Top>
            <Title fontsize="h3">{project.title}</Title>
            {editableAuthority && (
              <Style.IconWrapper>
                <Icon id="pencil-icon" icon="Pencil" onClick={toggleProjectModifyModal} />
                <Icon id="trashcan-icon" icon="TrashCan" onClick={() => handleDeleteItem(project.id)} />
              </Style.IconWrapper>
            )}
          </Style.Top>
          <Style.DateWrapper>
            {dateToString(project.startDate)} ~ {dateToString(project.endDate)}
          </Style.DateWrapper>
          <Style.IntroduceWrapper>
            <Paragraph content={project.introduce} size="large" />
          </Style.IntroduceWrapper>
          <Style.SkillWrapper>
            {project.projectSklls.map((skill) => (
              <Style.SkillItem key={skill.skillId}>
                <Tag
                  key={skill.skillId}
                  id={skill.skillId}
                  name={skill.skillName}
                  textColor={skill.textColor}
                  color={skill.color}
                />
              </Style.SkillItem>
            ))}
          </Style.SkillWrapper>
        </Style.Header>
        <Style.Left>
          <BoxWithIcon isContinuous iconProps={{ id: 'logo-icon', icon: 'Logo' }}>
            <Anchor to={project.githubUrl}>{project.githubUrl}</Anchor>
          </BoxWithIcon>
          <BoxWithIcon isContinuous iconProps={{ id: 'home-icon', icon: 'Home' }}>
            <Anchor to={project.deployUrl}>{project.deployUrl}</Anchor>
          </BoxWithIcon>
        </Style.Left>
        <Style.Right>
          <Paragraph content={project.content} size="medium" />
        </Style.Right>
      </Style.Container>
    </>
  );
}

export default ProjectItem;
