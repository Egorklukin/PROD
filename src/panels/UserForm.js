import { Panel, PanelHeader, PanelHeaderBack, FormItem, Input, Select, Button, FormLayoutGroup, Group, DateInput, CellButton } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const UserForm = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    destinationType: 'country',
    countryCity: '',
    companions: 'alone',
    childrenAges: '',
    transport: '',
    timeZone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showTransport, setShowTransport] = useState(true);
  const [showTimeZone, setShowTimeZone] = useState(true);

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Анкета поездки
      </PanelHeader>
      <Group>
        <FormLayoutGroup mode='horizontal'>
          <FormItem top="Дата начала поездки" htmlFor="start" topMultiline>
            <DateInput name="startDate" value={formData.startDate} onChange={handleInputChange} />
          </FormItem>
          <FormItem top="Дата конца поездки" htmlFor="end" topMultiline>
            <DateInput name="endDate" value={formData.endDate} onChange={handleInputChange} />
          </FormItem>
        </FormLayoutGroup>

        <FormLayoutGroup mode="vertical" segmented>
          <FormItem top="Куда едем">
            <Select
              name="destinationType"
              value={formData.destinationType}
              onChange={handleInputChange}
              options={[
                { value: 'country', label: 'По стране' },
                { value: 'abroad', label: 'За границу' },
              ]}
            />
          </FormItem>

          <FormItem>
            <Input
              name="countryCity"
              value={formData.countryCity}
              onChange={handleInputChange}
              placeholder="Например: Италия, Рим"
            />
          </FormItem>
        </FormLayoutGroup>

        <FormItem top="Состав">
          <Select
            name="companions"
            value={formData.companions}
            onChange={handleInputChange}
            options={[
              { value: 'alone', label: 'Один' },
              { value: 'friends', label: 'С друзьями / близкими' },
              { value: 'children', label: 'С детьми' },
            ]}
          />
        </FormItem>

        {formData.companions === 'children' && (
          <FormItem top="Возраст детей (по желанию)">
            <Input
              name="childrenAges"
              value={formData.childrenAges}
              onChange={handleInputChange}
              placeholder="Например: 5, 12"
            />
          </FormItem>
        )}

        {!showTransport ? (
          <CellButton onClick={() => setShowTransport(true)}>Указать вид транспорта</CellButton>
        ) : (
          <FormLayoutGroup
            mode="horizontal"
            removable
            onRemove={() => setShowTransport(false)}
          >
            <FormItem top="Вид транспорта (по желанию)">
              <Select
                name="transport"
                value={formData.transport}
                onChange={handleInputChange}
                options={[
                  { value: '', label: 'Не указано' },
                  { value: 'plane', label: 'Самолет' },
                  { value: 'train', label: 'Поезд' },
                  { value: 'car', label: 'Автомобиль' },
                ]}
              />
            </FormItem>
          </FormLayoutGroup>
        )}

        {!showTimeZone ? (
          <CellButton onClick={() => setShowTimeZone(true)}>Указать часовой пояс</CellButton>
        ) : (
          <FormLayoutGroup
            mode="horizontal"
            removable
            onRemove={() => setShowTimeZone(false)}
          >
            <FormItem top="Часовой пояс места назначения (по желанию)">
              <Input
                name="timeZone"
                value={formData.timeZone}
                onChange={handleInputChange}
                placeholder="Например: UTC+3"
              />
            </FormItem>
          </FormLayoutGroup>
        )}

        <FormItem>
          <Button size="l" stretched onClick={() => {
            console.log(formData);
            routeNavigator.back();
          }}>
            Сохранить
          </Button>
        </FormItem>
      </Group>
    </Panel>
  );
};

UserForm.propTypes = {
  id: PropTypes.string.isRequired,
};