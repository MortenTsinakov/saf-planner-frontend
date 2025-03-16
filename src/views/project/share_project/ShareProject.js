import { Column, DropdownMenu, FilledButton, IconButton, InputField, Modal, OutlineButton, Row, TextButton, Typography } from "components";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const ShareProject = ({
    setModalIsOpen
}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);


    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const results = [
        "George Bush", 
        "George Washington", 
        "Veryveryveryveryveryveryveryveryvervyveryevr Longname", 
        "Tin Man",
        "Mahatma Gandhi",
        "Napoleon Bonaparte",
        "Paul McCartney",
        "Brad Pitt",
        "Winston Churchill",
        "Usain Bolt",
        "Garry Gasparov",
    ]

    const renderSearchBar = () => {
        return (
            <div
                style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}
            >
                <Typography
                    fontSize='extrasmall'
                    color='label'
                >
                    Search for users by their full name
                </Typography>
                <Column
                        style={{
                            position: 'relative'
                        }}
                    >
                        <InputField
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder='Share project with...'
                        />
                        {
                            searchTerm.length > 0 &&
                            <IconButton
                                icon={<MdClose />}
                                style={{
                                    position: 'absolute',
                                    color: 'black',
                                    fontSize: '3rem',
                                    right: 0,
                                    top: 'calc(50% - 1.5rem)'
                                }}
                                title='Clear search'
                                onClick={() => setSearchTerm("")}
                            />
                        }
                    {
                        searchTerm.trim().length > 3 &&
                        <DropdownMenu style={{width: '100%', maxHeight: 300, overflowY: 'auto'}}>
                            <Column
                                style={{
                                    width: 'inherit',
                                    alignItems: 'start',
                                }}
                            >
                                {
                                    results.map((result, index) => 
                                        <TextButton
                                            key={index}
                                            style={{
                                                maxWidth: '100%',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                            onClick={() => setSelectedUser(result)}
                                        >
                                            <Typography
                                                style={{
                                                    textWrap: 'nowrap',
                                                }}
                                                >
                                                {result}
                                            </Typography>
                                        </TextButton>
                                    )
                                }
                            </Column>
                        </DropdownMenu>
                    }
                    </Column>
            </div>
        );
    }


    return (
        <Modal
            style={{width: 350}}
        >
            <Typography
                fontSize='medium'
                style={{marginBottom: '3rem'}}
            >
                Share project
            </Typography>
            <Column
                style={{
                    position: 'relative', 
                    gap: '3rem',
                    height: 200,
                    justifyContent: 'space-between'
                }}
            >
                {
                    selectedUser === null
                    ?
                    renderSearchBar()
                    :
                    <Column>
                        <Typography color='label' fontSize='extrasmall'>
                            Share project with:
                        </Typography>
                        <Row
                            style={{
                                borderBottom: '1px solid gray',
                                justifyContent: 'space-between',
                                maxWidth: 350,
                                height: '4.5rem',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                style={{
                                    textWrap: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {selectedUser}
                            </Typography>
                            <IconButton
                                icon={<MdClose />}
                                style={{fontSize: '2rem'}}
                                onClick={() => setSelectedUser(null)}
                            />
                        </Row>
                    </Column>
                }
                <Row style={{justifyContent: 'space-between'}}>
                    <OutlineButton
                        onClick={() => setModalIsOpen(false)}
                        style={{minWidth: 100}}
                    >
                        Cancel
                    </OutlineButton>
                    {
                        selectedUser !== null &&
                        <FilledButton
                            style={{minWidth: 100}}
                        >
                            Share
                        </FilledButton>
                    }
                </Row>
            </Column>
        </Modal>
    );
}
 
export default ShareProject;