import React, { ChangeEvent, FocusEvent, FormEvent, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import DB, { DBOutcome } from '../api/DB';
import { Views } from '../App';
import MenuButton from '../components/UI/Buttons/MenuButton';
import SimpleButton, { ButtonColor } from '../components/UI/Buttons/SimpleButton';
import Card from '../components/UI/Containers/Card';
import ViewContainer from '../components/UI/Containers/ViewContainer';
import ErrorMessage from '../components/UI/ErrorMessage';
import { IconType } from '../components/UI/Icon';
import AuthContext from '../contexts/AuthContext';
import ShoppingList from '../models/ShoppingList';
import css from './AddShoppingListView.module.css';

interface Props {}

const nameRegex = /[\p{L}]+/gmu;

const AddShoppingListView = (props: Props) => {
  const authContext = useContext(AuthContext);
  const nav = useNavigate();
  const [name, setName] = useState<string>('');
  const [nameEdited, setNameEdited] = useState<boolean>(false);
  const [nameIsServerValid, setNameIsServerValid] = useState<boolean>(true);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
  const nameIsRegexValid = name.match(nameRegex) !== null;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNameEdited(false);
    setNameIsServerValid(true);
    setName(event.target.value);
  };

  const nameBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setNameEdited(true);
  };

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authContext.profile !== null) {
      setIsLoading(true);
      const newShoppingList: ShoppingList = {
        name: name,
        profiles: [authContext.profile],
        itemsToBuy: [],
      };
      const result = await DB.addShoppingList(newShoppingList, authContext.profile);
      switch (result.dbOutcome) {
        case DBOutcome.OK:
          authContext.setProfile((profile) => {
            return { ...profile, shoppingLists: [...profile.shoppingLists, result.value as ShoppingList] };
          });
          nav(Views.SHOPPING_LISTS + Views.VIEW_SHOPPING_LIST + newShoppingList.id);
          break;
        case DBOutcome.ERROR:
          setNameIsServerValid(false);
          setServerErrorMessage(result.value as string);
          break;
      }
      setIsLoading(false);
    }
  };

  const cancelButtonHandler = () => {
    nav(Views.SHOPPING_LISTS);
  };
  const footerBar = document.getElementById('footer-bar');

  return (
    <>
      {footerBar &&
        createPortal(
          <>
            <MenuButton label='Indietro' icon={IconType.CHEVRON_LEFT} to={Views.SHOPPING_LISTS} />
          </>,
          footerBar
        )}
      <ViewContainer>
        <Card iSLoading={isLoading}>
          <form className={css['add-shopping-list-form']} onSubmit={formSubmitHandler}>
            <div>
              <input
                placeholder='Nome lista'
                type='text'
                value={name}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                className={(!nameIsRegexValid || !nameIsServerValid) && nameEdited ? 'invalid' : ''}
              />
              <ErrorMessage condition={!nameIsRegexValid && nameEdited}>Nome non valido.</ErrorMessage>
              <ErrorMessage condition={!nameIsServerValid && nameEdited}>{serverErrorMessage}</ErrorMessage>
            </div>
            <SimpleButton label='Aggiungi' type='submit' />
            <SimpleButton
              label='Annulla'
              icon={IconType.CHEVRON_LEFT}
              buttonColor={ButtonColor.CANCEL}
              iconFirst={true}
              onClick={cancelButtonHandler}
            />
          </form>
        </Card>
      </ViewContainer>
    </>
  );
};

export default AddShoppingListView;
