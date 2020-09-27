<?php

namespace Biz\InformationCollect\FormItem;

class ProvinceCityAreaFormItem extends FormItem
{
    const TYPE = 'cascader';

    const TITLE = '省市区县';

    const FIELD = 'province_city_area';

    public function getData()
    {
        return [
            'type' => self::TYPE,
            'title' => self::TITLE,
            'field' => self::FIELD,
            'value' => empty($this->value) ? [] : $this->value,
            'props' => [
                'options' => [],
                'placeholder' => '请选择省市区县',
            ],
            'validate' => [
                ['required' => $this->required, 'message' => self::TITLE.'不能为空'],
            ],
        ];
    }
}
