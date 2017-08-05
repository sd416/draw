import * as React from 'react'
import styled from 'styled-components'

import DivLink from 'components/DivLink'

import { Team } from 'utils/team'
import getGroupLetter from 'utils/getGroupLetter'

import PossibleGroups from './PossibleGroups'

const ISSUES_URL = 'https://github.com/inker/draw/issues'

const Root = styled.div`
  width: 100%;
  font-size: 1.25em;
  line-height: 150%;
  vertical-align: middle;

  margin-top: 30px;
  margin-bottom: 30px;

  user-select: none;

  @media (max-width: 999px) {
    font-size: 2.5em;
  }
`

const SelectedTeamWithColon = styled.span`
  display: inline-block;
`

const SelectedTeam = styled.span`
  font-weight: bold;
`

const Completed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  long: boolean,
  calculating?: boolean,
  completed: boolean,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  possibleGroups: number[] | null,
  numGroups: number,
  reset: any,
}

const Announcement: React.SFC<Props> = ({
  long,
  calculating,
  completed,
  selectedTeam,
  pickedGroup,
  possibleGroups,
  numGroups,
  reset,
}) => (
  <Root>
    {
      calculating ? (
        <div>
          <div>Calculation is taking too long.</div>
          <div>
            Please <a href={ISSUES_URL} target="_blank">report the bug</a>.
          </div>
        </div>
      ) :
      completed ? (
        <Completed>
          <div>Draw completed!</div>
          <DivLink onClick={reset}>Restart</DivLink>
        </Completed>
      ) :
      selectedTeam && possibleGroups ? (
        <div>
          Possible groups for <SelectedTeamWithColon>
            <SelectedTeam>{selectedTeam.name}</SelectedTeam>:
          </SelectedTeamWithColon>
          <PossibleGroups
            numGroups={numGroups}
            possibleGroups={possibleGroups}
          />
        </div>
      ) :
      pickedGroup !== null ? `${
        long && selectedTeam ? `${selectedTeam.shortName || selectedTeam.name} goes to g` : 'G'
      }roup ${getGroupLetter(pickedGroup)}!` :
      'Pick a ball'
    }
  </Root>
)

export default Announcement
