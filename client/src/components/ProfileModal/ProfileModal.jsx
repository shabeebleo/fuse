import { Modal, useMantineTheme } from '@mantine/core';

function ProfileModal({modalOpened,setModalOpened}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='65%'
      opened={modalOpened }
      onClose={()=>{setModalOpened(false)}}
    >
      <form className='infoForm'>
        <h3>Your Info</h3>
        <div >
            <input type="text" className="infoInput" name='FirstName' placeholder='First Name'/>
            <input type="text" className="infoInput" name='LastName' placeholder='Last Name'/>
        </div>
        <div>
        <input type="text" className="infoInput" name='WorksAT' placeholder='Works At'/>
        </div>
        <div>
        <input type="text" className="infoInput" name='LivesIN' placeholder='Lives IN'/>
            <input type="text" className="infoInput" name='Country' placeholder='Country'/>
        </div>
        <div>
            <input type="text" className="infoInput" name="" placeholder='RelationShip status' id="" />
        </div>
        <div>
            Profile Image
            <input type="file" name='profileImage' />
            Cover Image
            <input type="file"  name='coverImage'/>
            <button className="button infoButton">Update</button>
        </div>
      </form>
    </Modal>
  );
}
export default ProfileModal