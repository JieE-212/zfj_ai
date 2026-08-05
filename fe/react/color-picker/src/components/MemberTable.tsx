import * as React from 'react';
import { type MemberEntity } from '../model/member';
import { getMembersCollection } from '../api/memberApi';

const MemberRow = (props) => {
  const { member } = props;
  return (
    <tr>
      <td>
        <img src={member.avatar_url} style={{ maxWidth: '10rem' }} />
      </td>
      <td>
        <span>{member.id}</span>
      </td>
      <td>
        <span>{member.login}</span>
      </td>
    </tr>
  )
}

const MemberTable: React.FC = () => {
  const [memberCollection, setMemberCollection] = React.useState<MemberEntity[]>([
    {
      id: 1,
      avatar_url: '',
      login: '祖豪',
    },
    {
      id: 2,
      avatar_url: 'https://p6-passport.byteacctimg.com/img/user-avatar/d2f1e5a41493374840ba4bea5cceee71~60x60.awebp',
      login: '阿杰',
    }
  ]);
  React.useEffect(() => {
    // 挂载后请求接口 不会影响组件的渲染
    (async () => {
      const members = await getMembersCollection();
      setMemberCollection(members);
    })();
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            memberCollection.map((member: MemberEntity) => (
              <MemberRow key={member.id} member={member} />
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default MemberTable
