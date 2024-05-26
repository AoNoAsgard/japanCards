import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box, Typography, IconButton, Collapse } from '@mui/material';
import { useCheckboxContext } from './CheckboxContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HeaderCheckBoxes: React.FC = () => {
    const { checkboxes, toggleCheckbox } = useCheckboxContext();
    const [collapsekana, setCollapsekana] = useState<boolean>(false)
    const [collapsekanji, setCollapsekanji] = useState<boolean>(false)

    const handleCollapseKanaClick = () => {
        setCollapsekana(!collapsekana);
    };

    const handleCollapseKanjiClick = () => {
        setCollapsekanji(!collapsekanji);
    };
    return (
        <Box >
            <Typography style={{ textAlign: 'center', fontSize: '20px' }}  onClick={handleCollapseKanaClick} >Che letture vuoi mostrare?
                <IconButton>
                    {collapsekana ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Typography>
            <Collapse in={collapsekana} timeout="auto">
                <FormGroup row>

                    <FormControlLabel
                        key={'hiragana'}
                        control={<Checkbox checked={checkboxes['hiragana']} onChange={() => toggleCheckbox('hiragana')} />}
                        label={'kana'}
                    />
                    <FormControlLabel
                        key={'kanji'}
                        control={<Checkbox checked={checkboxes['kanji']} onChange={() => toggleCheckbox('kanji')} />}
                        label={'kanji'}
                    />

                </FormGroup>
            </Collapse>
            <Typography style={{ textAlign: 'center', fontSize: '20px' }} onClick={handleCollapseKanjiClick} >Cosa mostrare?
                <IconButton >
                    {collapsekanji ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Typography>
            <Collapse  in={collapsekanji} timeout="auto">
                <FormGroup row>
                    <FormControlLabel
                        key={'NOMI'}
                        control={<Checkbox checked={checkboxes['NOMI']} onChange={() => toggleCheckbox('NOMI')} />}
                        label={'NOMI'}
                    />
                    <FormControlLabel
                        key={'AGGETTIVI'}
                        control={<Checkbox checked={checkboxes['AGGETTIVI']} onChange={() => toggleCheckbox('AGGETTIVI')} />}
                        label={'AGGETTIVI'}
                    />
                    <FormControlLabel
                        key={'VERBI'}
                        control={<Checkbox checked={checkboxes['VERBI']} onChange={() => toggleCheckbox('VERBI')} />}
                        label={'VERBI'}
                    />
                    <FormControlLabel
                        key={'AVVERBI'}
                        control={<Checkbox checked={checkboxes['AVVERBI']} onChange={() => toggleCheckbox('AVVERBI')} />}
                        label={'AVVERBI'}
                    />
                    <FormControlLabel
                        key={'SUFFISSI'}
                        control={<Checkbox checked={checkboxes['SUFFISSI']} onChange={() => toggleCheckbox('SUFFISSI')} />}
                        label={'SUFFISSI'}
                    />
                    <FormControlLabel
                        key={'ESPRESSIONI'}
                        control={<Checkbox checked={checkboxes['ESPRESSIONI']} onChange={() => toggleCheckbox('ESPRESSIONI')} />}
                        label={'ESPRESSIONI'}
                    />
                </FormGroup>
            </Collapse>
        </Box>
    );
};

export default HeaderCheckBoxes;
