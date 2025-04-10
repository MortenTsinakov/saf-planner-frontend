import { Card, Column, IconButton, Row, Typography } from "components";
import { useState } from "react";
import { MdArrowBack, MdArrowForward, MdClose, MdLightbulb } from "react-icons/md";

const TipsPanel = ({handleCloseTips}) => {

    const [page, setPage] = useState(1);

    const decrementPage = () => {
        setPage(Math.max(1, page - 1));
    }

    const incrementPage = () => {
        setPage(Math.min(8, page + 1));
    }

    const page1 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Welcome!
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    This view is for writing your script. Before jumping in, you might want to gather your ideas as fragments in the Planning view.
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Fragments aren't directly linked to the script, but they're great for developing the story first.
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Once you're ready, use this space
                    to turn your story into a properly formatted script.
                </Typography>
            </Column>
        );
    }

    const page2 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Script blocks
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Each script is made up of the following blocks:
                </Typography>
                <Typography fontSize='extrasmall'>
                    <ul>
                        <li>Header</li>
                        <li>Action</li>
                        <li>Character</li>
                        <li>Parenthetical</li>
                        <li>Dialogue</li>
                        <li>Transition</li>
                    </ul>
                </Typography>
            </Column>
        );
    }

    const page3 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Switching block types
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    There are several different ways for switching between block types:
                </Typography>
                <Typography fontSize='extrasmall'>
                    <ul>
                        <li>Automatic switching</li>
                        <li>Special character sequences on a new line</li>
                        <li>Choosing from the right click menu</li>
                        <li>Using Alt key shortcuts</li>
                    </ul>
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Let's examine each of those options
                </Typography>
            </Column>
        );
    }

    const page4 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Automatic switching
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Some block types are automatically determined by the previous block type when pressing enter:
                </Typography>
                <Typography fontSize='extrasmall'>
                    <ul>
                        <li>Header → Action</li>
                        <li>Character → Dialogue</li>
                        <li>Parenthetical → Dialogue</li>
                        <li>Dialogue → Action</li>
                        <li>Transition → Header</li>
                    </ul>
                </Typography>
            </Column>
        );
    }

    const page5 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Special sequences
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Some blocks can be switched to by writing a special sequence on a <u>new line</u> (don't include quotation marks):
                </Typography>
                <Typography fontSize='extrasmall'>
                    <b>Header</b> - write "EXT." or "INT." (doesn't have to uppercase)
                </Typography>
                <Typography fontSize='extrasmall'>
                    <b>Character</b> - press TAB key
                </Typography>
                <Typography fontSize='extrasmall'>
                    <b>Parenthetical</b> - write "("
                </Typography>
                <Typography fontSize='extrasmall'>
                    <b>Transition</b> - any uppercase sequence followed by a colon (e.g "CUT TO:")
                </Typography>
            </Column>
        );
    }

    const page6 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Right click menu
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Any block can be changed to another type by just right clicking on the editor and choosing the
                    desired block type.
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    The current block (where the cursor is positioned) will be converted to the chosen type.
                </Typography>
            </Column>
        );
    }

    const page7 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Alt key shortcuts
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Instead of right clicking on the editor and choosing block types from there you can use
                    Alt key shortcuts:
                </Typography>
                <Column style={{alignItems: 'center'}}>
                    <Column style={{width: '70%', gap: 0}}>
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall'>Header</Typography>
                            <Typography fontSize='extrasmall'>Alt + H</Typography>
                        </Row>
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall'>Action</Typography>
                            <Typography fontSize='extrasmall'>Alt + A</Typography>
                        </Row>
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall'>Character</Typography>
                            <Typography fontSize='extrasmall'>Alt + C</Typography>
                        </Row>
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall'>Parenthetical</Typography>
                            <Typography fontSize='extrasmall'>Alt + P</Typography>
                        </Row>
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall'>Dialogue</Typography>
                            <Typography fontSize='extrasmall'>Alt + D</Typography>
                        </Row>
                        <Row style={{justifyContent: 'space-between'}}>
                            <Typography fontSize='extrasmall'>Transition</Typography>
                            <Typography fontSize='extrasmall'>Alt + T</Typography>
                        </Row>
                    </Column>
                </Column>
            </Column>
        );
    }

    const page8 = () => {
        return (
            <Column>
                <Typography fontSize='medium'>
                    Happy scripwriting!
                </Typography>
                <Typography fontSize='extrasmall' color='label'>
                    Don't forget to save your work from time to time. You can use the icon on the toolbar
                    or shortcut "Alt + S" to save.
                </Typography>
            </Column>
        );
    }

    return (
        <Card
            style={{
                position: 'absolute',
                bottom : 25,
                right: 25,
                borderColor: 'var(--primary-color)',
                width: 350,
                height: 500,
                justifyContent: 'space-between',
            }}
        >
            <Row
                style={{justifyContent: 'space-between'}}
            >
                <MdLightbulb style={{fontSize: '3rem', color: 'var(--primary-color)'}}/>
                <IconButton
                    style={{
                        fontSize: '3rem'
                    }}
                    icon={<MdClose />}
                    onClick={handleCloseTips}
                />
            </Row>
            {page === 1 && page1()}
            {page === 2 && page2()}
            {page === 3 && page3()}
            {page === 4 && page4()}
            {page === 5 && page5()}
            {page === 6 && page6()}
            {page === 7 && page7()}
            {page === 8 && page8()}
            <Row style={{justifyContent: 'space-between'}}>
                {
                    page > 1
                    ?
                    <IconButton
                        icon={<MdArrowBack />}
                        onClick={decrementPage}
                    />
                    :
                    <div />
                }
                {
                    page < 8
                    ?
                    <IconButton
                        icon={<MdArrowForward />}
                        onClick={incrementPage}
                    />
                    :
                    <div />
                }
            </Row>
        </Card>
    );
}
 
export default TipsPanel;