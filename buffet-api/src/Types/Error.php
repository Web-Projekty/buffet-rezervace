<?php

namespace Buffet\Types;

enum Error: string {
    case NonExistentMethod = 'Tried to call a non-existent api method';
    case StatusPending = 'Status is still pending';
    case InvalidDataType = 'Handling api call resulted in invalid data type';

    /**
     * @return mixed
     */
    public function getValue(): string
    {
        return $this->value;
    }
}
