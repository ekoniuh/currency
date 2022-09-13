import CopyAllIcon from '@mui/icons-material/CopyAll';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Button, Fade, Paper, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { pink } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import queryString from 'query-string';
import React, { useContext, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { QueryContext } from '../../../context';
import configCheckBoxes from './config';
import { getNameBrowser } from './getNameBrowser';
import { updateArrayCheckbox } from './updateArrayCheckbox';

const configComponents = ['CurrencyRateForDay', 'CurrencyRateForPeriod', 'Converter'];

export const CheckBoxContainer = () => {
  const { paramsPage, setParamsPage } = useContext(QueryContext);
  const [arrayPages, setArrayPages] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = useState();

  let navigate = useNavigate();
  let { search } = useLocation();

  const sUsrAg = window.navigator.userAgent;
  const nameBrowser = getNameBrowser(sUsrAg);

  const query = queryString.parse(search, { parseNumbers: true });

  useEffect(() => {
    const tempArrayQuery = typeof query?.isShowPage === 'string' ? [query?.isShowPage] : query?.isShowPage;

    setArrayPages(tempArrayQuery ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const changeCheckBox = (position) => {
    let updatedCheckedState = updateArrayCheckbox(arrayPages, position, configComponents);

    navigate({
      search: createSearchParams({ ...paramsPage, isShowPage: [...updatedCheckedState] }).toString(),
    });

    setParamsPage((prevState) => ({
      ...prevState,
      isShowPage: [...updatedCheckedState],
    }));
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column' }}>
      <FormControl sx={{ mt: 1, m: 1 }} component="fieldset" variant="standard">
        <FormGroup sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', flexDirection: 'row' }}>
          {configCheckBoxes.map(({ label, key }, index) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                      color: pink[600],
                    },
                  }}
                  checked={arrayPages.includes(key)}
                  onChange={() => changeCheckBox(index)}
                  name={key}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Box
        sx={{ mt: 1, m: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', gap: 2 }}
      >
        <Box>
          <Tooltip title="Используемый браузер">
            <Chip label={nameBrowser} variant="outlined" sx={{ fontSize: 16, color: 'white' }} />
          </Tooltip>
        </Box>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper sx={{ maxWidth: 300 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ p: 2, whiteSpace: 'nowrap', overflow: 'hidden ', textOverflow: 'ellipsis' }}>
                    {window.location.href}
                  </Typography>
                  <Tooltip title="Скопировать ссылку">
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                      sx={{ width: 30, height: 30 }}
                      aria-label="delete"
                    >
                      <CopyAllIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>

        <Button
          onClick={handleClick('bottom')}
          variant="contained"
          sx={{
            color: '#fff4f4',
            backgroundColor: '#9105d8c9',
            borderRadius: 30,
            mr: 2,
            ml: 2,
            fontSize: 10,
            '&:hover': {
              backgroundColor: '#490e66c8',
            },
          }}
          endIcon={<ShareIcon />}
        >
          Get link
        </Button>
      </Box>
    </Box>
  );
};
