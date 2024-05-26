import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import { useCheckboxContext } from './CheckboxContext';

const HeaderCheckBoxes: React.FC = () => {
    const { checkboxes, toggleCheckbox } = useCheckboxContext();

    return (
        <Box >
            <Typography style={{ textAlign: 'center', fontSize: '20px' }}  >Che letture vuoi mostrare? </Typography>
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
            <Typography style={{ textAlign: 'center', fontSize: '20px' }}  >Cosa mostrare? </Typography>
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
        </Box>
    );
};

export default HeaderCheckBoxes;
